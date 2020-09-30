
declare class OrdersPaymentsCommonFields{
    path: string;
    verb: string;
    body: any;
    headers: Record<string, any>;
    constructor(orderId: string);

}
type Links = {
    rel: string,
    method: string,
    href: string,
  }[];

interface OrderDetails{
    status: string;
    intent: string;
    payment_source: {
        alipay: {
          name: string;
          country_code: string;
        },
    },
    purchase_units: {
        custom_id?: string;
        reference_id: string;
        amount: {
            currency_code: string;
            value: string;
        },
        payee: {
            email_address: string
        }
    }[];
    create_time: string;
    links: Links;
}
interface PaymentDetails {
    id: string,
    status: string,
    amount: {
      total: string;
      currency: string;
    },
    invoice_id: string,
    seller_protection: {
      status: string,
      dispute_categories: string[]
    },
    expiration_time: string,
    create_time: string,
    update_time?: string,
    links: Links;
  }

declare module paypal {
    namespace core {
        type environment = SandboxEnvironment | LiveEnvironment
        class AccessToken {

        }
        class AccessTokenRequest {
            constructor(environment: PayPalEnvironment, refreshToken?: string)
        }
        class PayPalEnvironment {
            clientId: string;
            clientSecret: string;
            baseUrl: string;
            webUrl: string;
            constructor(
                clientId: string,
                clientSecret: string,
                baseUrl: string,
                webUrl: string,
            )
            authorizationString(): string;
        }
        class SandboxEnvironment extends PayPalEnvironment {
            constructor(clientId: string, clientSecret: string)
        }

        class LiveEnvironment extends PayPalEnvironment {
            constructor(clientId: string, clientSecret: string)
        }

        class PayPalHttpClient {
            constructor(environment: environment);
            execute(request: any): Promise<{result: OrderDetails & PaymentDetails}>
        }
        class RefreshTokenRequest {
            constructor(environment: PayPalEnvironment, code: string);

        }
        class TokenCache {
            static cacheForEnvironment(environment: environment, refreshToken: string): any;
        }
    }


    namespace payments {
        class AuthorizationsCaptureRequest extends OrdersPaymentsCommonFields{}
        class AuthorizationsGetRequest extends OrdersPaymentsCommonFields{}
        class AuthorizationsReauthorizeRequest extends OrdersPaymentsCommonFields{}
        class AuthorizationsVoidRequest extends OrdersPaymentsCommonFields{}
        class CapturesGetRequest extends OrdersPaymentsCommonFields{}
        class CapturesRefundRequest extends OrdersPaymentsCommonFields{}
        class RefundsGetRequest extends OrdersPaymentsCommonFields{}
    }
    namespace orders {

        class OrdersAuthorizeRequest extends OrdersPaymentsCommonFields {
            payPalClientMetadataId(payPalClientMetadataId: string): this;
            payPalRequestId(payPalRequestId: string): this;
            prefer(prefer: any): this;
            requestBody(orderActionRequest: any): this;
        }
        class OrdersCaptureRequest extends OrdersPaymentsCommonFields{
            payPalClientMetadataId(payPalClientMetadataId: string): this;
            payPalRequestId(payPalRequestId: string): this;
            prefer(prefer: any): this;
            requestBody(orderActionRequest: any): this;
        }
        class OrdersCreateRequest extends OrdersPaymentsCommonFields{
            payPalPartnerAttributionId(payPalPartnerAttributionId: string): this;
            prefer(prefer: any): this;
            requestBody(orderActionRequest: any): this;
        }
        class OrdersGetRequest extends OrdersPaymentsCommonFields{
            constructor(orderId: string);
        }
        class OrdersPatchRequest extends OrdersPaymentsCommonFields{
            requestBody(orderActionRequest: any): this;

        }
        class OrdersValidateRequest extends OrdersPaymentsCommonFields{
            payPalClientMetadataId(payPalClientMetadataId: string): this;
            requestBody(orderActionRequest: any): this;
        }
    }

}

export = paypal