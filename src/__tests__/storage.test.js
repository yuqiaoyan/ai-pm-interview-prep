import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getItem, setItem, removeItem, clear, STORAGE_KEYS } from '../services/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getItem', () => {
    it('should return parsed value when key exists', () => {
      localStorage.setItem('test_key', JSON.stringify({ foo: 'bar' }));
      const result = getItem('test_key');
      expect(result).toEqual({ foo: 'bar' });
    });

    it('should return default value when key does not exist', () => {
      const result = getItem('nonexistent_key', { default: true });
      expect(result).toEqual({ default: true });
    });

    it('should return null as default when no default provided', () => {
      const result = getItem('nonexistent_key');
      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('should store value as JSON string', () => {
      const testValue = { test: 'value', number: 42 };
      setItem('test_key', testValue);
      const stored = localStorage.getItem('test_key');
      expect(JSON.parse(stored)).toEqual(testValue);
    });

    it('should return true on success', () => {
      const result = setItem('test_key', { value: 123 });
      expect(result).toBe(true);
    });

    it('should handle arrays correctly', () => {
      const testArray = ['a', 'b', 'c'];
      setItem('test_array', testArray);
      const result = getItem('test_array');
      expect(result).toEqual(testArray);
    });
  });

  describe('removeItem', () => {
    it('should remove item from storage', () => {
      localStorage.setItem('test_key', 'value');
      removeItem('test_key');
      expect(localStorage.getItem('test_key')).toBeNull();
    });

    it('should return true on success', () => {
      localStorage.setItem('test_key', 'value');
      const result = removeItem('test_key');
      expect(result).toBe(true);
    });
  });

  describe('clear', () => {
    it('should clear all app-related storage keys', () => {
      // Set multiple storage keys
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.setItem(key, JSON.stringify({ data: 'test' }));
      });

      clear();

      // Verify all app keys are cleared
      Object.values(STORAGE_KEYS).forEach(key => {
        expect(localStorage.getItem(key)).toBeNull();
      });
    });

    it('should return true on success', () => {
      const result = clear();
      expect(result).toBe(true);
    });
  });
});
