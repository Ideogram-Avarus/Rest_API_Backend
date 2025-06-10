import { SignOptions } from 'jsonwebtoken'; 
import jwt from 'jsonwebtoken'
import { InvalidToken } from "@/infra/errors/Validation";

abstract class TokenBuilder {
    private _token?: string
    private _UserId?: number
    private secretKey: string

    protected constructor() {
        this.secretKey = process.env.SECRET_KEY as string;
    }

    generate() {
        if (!this.tokenFlag) {
            throw new Error('tokenFlag is not defined.');
        }
        if (!this.expiresIn) {
            throw new Error('expiresIn is not defined.');
        }

        this._token = jwt.sign(
            { userId: this._UserId, tokenFlag: this.tokenFlag },
            this.secretKey,
            { expiresIn: this.expiresIn}
        );
    }
    validate() {
        try{
            const decoded = jwt.verify(this._token as string, this.secretKey) as { userId: number, tokenFlag: string };
            const { userId, tokenFlag } = decoded
            if (tokenFlag !== this.tokenFlag) {
                throw InvalidToken
            }
            this._UserId = userId
            }
        catch (error) {
            throw InvalidToken
        }
    }


    static fromToken(token: string): TokenBuilder {
        const instance = new (this as any)();
        instance._token = token;
        instance.validate();
        return instance;
    }

    static fromUserId(UserId: number): TokenBuilder {
        const instance = new (this as any)();
        instance._UserId = UserId;
        instance.generate();
        instance.validate();
        return instance;
    }



    //getters
    protected get tokenFlag(): string {
        const constructor = this.constructor as typeof TokenBuilder & { tokenFlag: string };
        if (!constructor.tokenFlag) {
            throw new Error('tokenFlag is not defined.');
        }
        return constructor.tokenFlag;
    }

    protected get expiresIn(): Extract<SignOptions["expiresIn"], string> {
        const constructor = this.constructor as typeof TokenBuilder & { expiresIn: Extract<SignOptions["expiresIn"], string> };
        if (!constructor.expiresIn) {
            throw new Error('expiresIn is not defined.');
        }
        return constructor.expiresIn;
    }


    get token() {
        !this._token? this.generate(): undefined
        return this._token
    }
    
    get UserId() {
        !this._UserId? this.generate(): undefined
        return this._UserId
    }
}


export class AccessToken extends TokenBuilder {
    static tokenFlag: string = 'Bearer'
    static expiresIn: string = '1h'
}

export class RefreshToken extends TokenBuilder {
    static tokenFlag: string = 'Refresh'
    static expiresIn: string = '12h'
}
