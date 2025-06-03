export interface Post {
  post_id: number;
  student_id: number;
  student_name: string;
  university: string;
  work_type: string;
  subject_area: string;
  description: string;
  initial_price: number;
  creation_date: Date;
}
/*{
“document_id”: “document id”,
“name”: “document name”,
“upload_date”: “date”,
“work_type”: “work type”,
“content_type”: “MIME type”,
“download_url”: “url”
}
*/
export interface Document {
  document_id: number;
  name: string;
  upload_date: Date;
  work_type: string;
  content_type: string;
  download_url: string;
}

export interface DealPost {
  student_id: number;
  student_name: string;
  teacher_id: number;
  teacher_name: string;
  deal_id: number;
  creation_date: Date;
  price: number;
  post_id: number;
  work_type: string;
  university: string;
  post_description: string;
  student_feedback: string;
  deal_status: string;
}
