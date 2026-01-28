import { API } from "./axios"

export interface User {
  _id: string
  name: string
  username: string
  profilePicture: string
  uid: string
  venmo?: string
  cashApp?: string
}

export interface DonationPost {
  _id: string
  title: string
  description: string
  tagline: string
  amount: number
  amountRaised: number
  user: User
  media: string[]
  likes: number
  comments: number
  endDate: string
  isOwn: boolean
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

export interface AnonymousPost {
  _id: string
  description: string
  user: null
  media: string[]
  likes: number
  comments: number
  isOwn: boolean
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

export interface GetPostsParams {
  type: "donation" | "post"
  page?: number
  limit?: number
  search?: string
}

export interface GetPostsResponse {
  success: boolean
  message: string
  data: DonationPost[] | AnonymousPost[]
  pagination: {
    itemsPerPage: number
    currentPage: number
    totalItems: number
    totalPages: number
  }
}

export const postsAPI = {
  getPosts: async (params: GetPostsParams): Promise<GetPostsResponse> => {
    try {
      const response = await API.get<GetPostsResponse>("/posts", {
        params: {
          type: params.type,
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
        },
      })
      return response.data
    } catch (error: any) {
      throw {
        message: error?.response?.data?.message || "Failed to fetch posts",
        status: error?.response?.status || 500,
      }
    }
  },
}
