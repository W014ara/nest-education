export interface IQueueConfig {
   url: string;
   queue: string;
   msg?: any;
   durable: boolean;
   noAck?: boolean;
   closeConTime?: number;
}

export interface IQueueDictMsg {
   [key: string]: string[];
}
