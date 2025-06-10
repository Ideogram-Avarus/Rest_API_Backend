import { ZodObject } from 'zod';
import { CustomError } from '@/infra/errors/Common';

abstract class SchemaBuilder {
  static getSchemaBody?: ZodObject<any>
  static postSchemaBody?: ZodObject<any>
  static deleteSchemaBody?: ZodObject<any> 
  static putSchemaBody?: ZodObject<any> 
  static patchSchemaBody?: ZodObject<any> 
  
  static getSchemaResponse?: Record<number,ZodObject<any>>
  static postSchemaResponse?: Record<number,ZodObject<any>>
  static deleteSchemaResponse?: Record<number,ZodObject<any>>
  static putSchemaResponse?: Record<number,ZodObject<any>>
  static patchSchemaResponse?: Record<number,ZodObject<any>>
  
  static get GetSchemaBody() {
    if (!this.getSchemaBody) throw new CustomError(500, 'GetSchemaBody not found');
    return this.getSchemaBody
  }

  static get PostSchemaBody() {
    if (!this.postSchemaBody) throw new CustomError(500, 'PostSchemaBody not found');
    return this.postSchemaBody
  }

  static get DeleteSchemaBody() {
    if (!this.deleteSchemaBody) throw new CustomError(500, 'DeleteSchemaBody not found');
    return this.deleteSchemaBody
  }

  static get PutSchemaBody() {
    if (!this.putSchemaBody) throw new CustomError(500, 'PutSchemaBody not found');
    return this.putSchemaBody
  }

  static get PatchSchemaBody() {
    if (!this.patchSchemaBody) throw new CustomError(500, 'PatchSchemaBody not found');
    return this.patchSchemaBody
  }

  static get GetSchemaResponse() {
    if (!this.getSchemaResponse) throw new CustomError(500, 'GetSchemaResponse not found');
    return this.getSchemaResponse
  }

  static get PostSchemaResponse() {
    if (!this.postSchemaResponse) throw new CustomError(500, 'PostSchemaResponse not found');
    return this.postSchemaResponse
  }

  static get DeleteSchemaResponse() {
    if (!this.deleteSchemaResponse) throw new CustomError(500, 'DeleteSchemaResponse not found');
    return this.deleteSchemaResponse
  }

  static get PutSchemaResponse() {
    if (!this.putSchemaResponse) throw new CustomError(500, 'PutSchemaResponse not found');
    return this.putSchemaResponse
  }

  static get PatchSchemaResponse() {
    if (!this.patchSchemaResponse) throw new CustomError(500, 'PatchSchemaResponse not found');
    return this.patchSchemaResponse
  }

}

export default SchemaBuilder