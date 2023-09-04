import Attendance from '../models/product.model';
import { IAttendance, IAttendanceUpdate } from '../interfaces/user.interface';

export class AttendanceService {
  async create(data: IAttendance, language?: string) {
    const attendance = new Attendance(data);
    return attendance.save();
  }

  async getAll(clientId:string, limit:number,page : number,language ?: string) {
    const attendances =  await Attendance.find({clientId}).limit(limit)
                          .skip(page * limit)
                          .lean()
                          .exec();
    return attendances;
  }

  async getOne( clientId : string , userId : string, language ?: string ) {
    const attendance = await Attendance.findOne({clientId,userId}).exec();
    return attendance;
  }

  async updateOne( clientId : string , userId : string, body : IAttendanceUpdate, language ?: string ) {
    const attendance = await Attendance.findOne({clientId,userId:userId}).exec();
    if(body.attendance.timeCollection) attendance.timeCollection.push(body.attendance.timeCollection);
    if(body.attendance.request) attendance.request.push(body.attendance.request);
    if(body.status) attendance.status
    return await Attendance.updateOne(attendance._id,attendance);
  }

  async delete( clientId : string , userId : string , language ?: string){
    return await Attendance.findByIdAndRemove({clientId,userId:userId}).exec();
  }

}
