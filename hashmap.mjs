export default class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  size = 0;
  buckets = new Array(this.capacity);

  hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  };

  set = (key, value) => {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) this.buckets[index] = [];

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size > this.capacity * this.loadFactor) this.resize();
  };

  get = (key) => {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) return null;

    const bucket = this.buckets[index];

    for (let [storedKey, storedValue] of bucket) {
      if (storedKey === key) return storedValue;
    }

    return null;
  };

  has = (key) => {
    return this.get(key) !== null;
  };

  remove = (key) => {
    if (!this.has(key)) return false;

    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) return false;

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (key === bucket[i][0]) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  };

  length = () => {
    return this.size;
  };

  cap = () => {
    return this.capacity
  }

  clear = () => {
    this.capacity = 16;
    this.size = 0;
    this.buckets = new Array(this.capacity);
  };

  keys = () => {
    const keysArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [storedKey, storedValue] of bucket) {
          keysArray.push(storedKey);
        }
      }
    }
    return keysArray;
  };

  values = () => {
    const valuesArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [storedKey, storedValue] of bucket) {
          valuesArray.push(storedValue);
        }
      }
    }
    return valuesArray;
  };

  entries = () => {
    const entriesArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [storedKey, storedValue] of bucket) {
          entriesArray.push([storedKey, storedValue]);
        }
      }
    }
    return entriesArray;
  };

  resize = () => {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity);

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let [storedKey, storedValue] of bucket) {
          this.set(storedKey, storedValue);
        }
      }
    }
  };
}
