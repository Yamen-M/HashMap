export default class HashMap{
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
    }

    set = (key, value) => {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!this.buckets[index]) this.buckets[index] = [];

        const bucket = this.buckets[index];
        
        for(let i = 0; i < bucket.length; i++)
        {
            if(bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if(this.size > this.capacity * this.loadFactor) this.resize()
    }

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
    }

    resize = () => {

    }
}