export interface PostAddition {
  work_type: string;
  university: string;
  subject_area: string;
  initial_price: number;
  description: string;
}

/*{
“subscription_id”: “subscription id”,
“name”: “subscription name”,
“description”: “description”,
“price”: “subscription price”,
“last_activation_date”: “date”,
“next_payment_date”: “date”
}
*/
export interface MySubscription {
  subscription_id: string;
  name: string;
  description: string;
  price: number;
  last_activation_date: Date;
  next_payment_date: Date;
}
