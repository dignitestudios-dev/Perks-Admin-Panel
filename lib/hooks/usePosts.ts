import { useQuery } from "@tanstack/react-query"
import { postsAPI, GetPostsParams, GetPostsResponse } from "@/lib/api/posts.api"

export function usePosts(params: GetPostsParams) {
  return useQuery<GetPostsResponse, { message: string; status: number }>({
    queryKey: ["posts", params.type, params.page, params.limit, params.search],
    queryFn: () => postsAPI.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!params.type,
  })
}
