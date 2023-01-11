import { Controller } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office, default: null })
  // originOffice?: Office;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office, default: null })
  // destinationOffice?: Office;
}
