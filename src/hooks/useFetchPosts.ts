// src/hooks/useFetchPosts.ts
import { useState, useEffect } from 'react';
import { fetchPosts } from '@/services/postsService'; // Đảm bảo sử dụng đúng postService
import type { Post } from '@/types/post'; // Kiểu Post

export const useFetchPosts = (page: number = 1, limit: number = 10, search: string = '') => {
    const [posts, setPosts] = useState<Post[]>([]); // State lưu danh sách bài viết
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
    const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
    const [total, setTotal] = useState<number>(0); // Tổng số bài viết
    const [lastPage, setLastPage] = useState<number>(1); // Tổng số trang

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetchPosts({ limit, page, search }); // Fetch dữ liệu từ API
                setPosts(res.items);
                setTotal(res.meta.total);
                setLastPage(res.meta.last_page);
            } catch (err: any) {
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [page, limit, search]); // Fetch lại khi page, limit hoặc search thay đổi

    return { posts, loading, error, total, lastPage };
};
