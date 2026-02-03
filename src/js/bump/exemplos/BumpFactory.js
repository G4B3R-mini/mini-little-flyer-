
export class IBumpFactory {
      constructor(physic) {
        this.physic = physic;
      }
    
      create() {
     throw new Error("Method 'create()' must be implemented.");
      }
}