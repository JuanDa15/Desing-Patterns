class Singleton {

  // The only isntance that will be used in the singleton
  private static instance: Singleton;
  // Other attributes that you need
  private _randomAttribute: string;

  /**
   * The constructor need to be private because the only one who
   * cans instance the class is by self
   */
  private constructor() {
    // Init attributes
    this._randomAttribute = 'random thing';
  }

  /**
   * [getInstance]
   *  method that creates the instance or returns 
   *  the existing instance
   * @return  {Singleton}  [class instance]
   */
  public static getInstance(): Singleton {
    if ( !Singleton.instance ) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  // Rest of methods
  get randomAttribute() {
    return this._randomAttribute;
  }

  public transformRandomAttribute(value: string): string {
    return this._randomAttribute + value;
  }
}

export default Singleton;