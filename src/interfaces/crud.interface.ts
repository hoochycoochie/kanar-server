interface BaseCrudInterface {
  save(data: any): Promise<any>;
  find(): Promise<any>[];
  update(id: any, data: any): Promise<any>;
  remove(id: any): Promise<any>;
  findOne(data: any): Promise<any>;
}

export default BaseCrudInterface;
