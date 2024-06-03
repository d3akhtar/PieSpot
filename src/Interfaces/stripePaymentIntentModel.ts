export default interface stripePaymentIntentModel {
    id: string;
    object: string;
    amount: number;
    amount_details: any;
    automatic_payment_methods: any;
    canceled_at?: any;
    cancellation_reason?: any;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    description?: any;
    last_payment_error?: any;
    livemode: boolean;
    next_action?: any;
    payment_method: string;
    payment_method_configuration_details?: any;
    payment_method_types: string[];
    processing?: any;
    receipt_email?: any;
    setup_future_usage?: any;
    shipping?: any;
    source?: any;
    status: string;
  }