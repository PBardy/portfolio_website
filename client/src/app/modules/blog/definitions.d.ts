export interface Navigable {
  slug: string;
}

export namespace User {
  export interface SignUpCredentials {
    fname: string;
    lname: string;
    password: string;
    rpassword: string;
    email: string;
  }

  export interface SignUpResponse {}

  export interface User {
    id: number;
    fname: string;
    lname: string;
    email: string;
  }

  export interface SignInCredentials {
    email: string;
    password: string;
  }

  export interface SignInResponse {
    user: User.User;
  }

  export interface Profile extends Navigable {
    fname: string;
    lname: string;
    email: string;
    avatar?: string;
  }
}

export namespace Blog {
  export interface CommentStub {
    title: string;
    markdown: string;
  }

  export interface Comment extends CommentStub {
    sanitizedHtml: string;
    author: User.Profile;
  }

  export interface ArticleStub {
    title: string;
    description: string;
    markdown: string;
    thumbnail?: string;
    caption?: string;
  }
  export interface Article extends ArticleStub, Navigable {
    id: number;
    sanitizedHtml: string;
    author: User.Profile;
    updated_at: Date;
    created_at: Date;
  }
}

export namespace Auth {}

export namespace Responses {
  export interface ActionState {
    error: string;
    success: boolean;
    errorMessage: string;
    successMessage: string;
  }
}
