import { API } from "./axios";

/**
 * Tip/Contribution data structure
 */
export interface Tip {
  _id: string;
  sentBy: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  amount: number;
  appFee: number;
  stripeFee: number;
  method: "card" | "cashApp" | "venmo" | "bank" | "wallet";
  type: "tip" | "donation";
  receipt?: string;
  isAnonymous: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Review/Feedback data structure
 */
export interface Review {
  _id: string;
  reviewer: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  stars: number;
  description: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * User Detail type definitions from backend
 */
export interface UserDetail {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture: string;
  documents: Array<{
    name: string;
    url: string;
  }>;
  occupation: string;
  businessName: string;
  jobDescription: string;
  branch: string;
  city: string;
  state: string;
  uid: string;
  venmo: string;
  cashApp: string;
  tipsSent: number;
  totalEarnings: number | null;
  tipsReceived: number;
  reviewsGiven: number;
  reviewsReceived: number;
  rating: number;
  isOwn: boolean;
  myEarnings?: Tip[];
  myContributions?: Tip[];
  feedBackReceived?: Review[];
  feedBackGiven?: Review[];
  stripeProfileStatus: "approved" | "rejected" | "in-review" | "not-provided";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSignUpCompleted: boolean;
  isProfileCompleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserDetailResponse {
  success: boolean;
  message: string;
  data: UserDetail;
}

/**
 * User Details API service
 * Handles user profile data fetching
 */
export const userDetailsAPI = {
  /**
   * Get user details by ID
   * @param userId - User ID (MongoDB ObjectId)
   * @returns User detail data
   */
  getById: async (userId: string): Promise<UserDetail> => {
    try {
      const response = await API.get<GetUserDetailResponse>("/users", {
        params: {
          userId,
        },
      });

      return response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch user details";

      throw {
        message,
        status: error?.response?.status,
      };
    }
  },
};
