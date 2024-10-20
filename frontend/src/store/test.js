const test = {
    allNews: {
        first: {
            total: 21,
            total_page: 2,
            page: 1,
            per_page: 15,
            messages: [
                {
                    id: 1,
                    title: "this is a test message",
                    content: "this is a **test**.",
                    notified_at: "2020-09-01 00:00:00",
                },
                {
                    id: 2,
                    title: "another test message",
                    content: "this is another **test** message.",
                    notified_at: "2020-09-02 00:00:00",
                },
                {
                    id: 3,
                    title: "yet another test message",
                    content: "this is yet another **test** message.",
                    notified_at: "2020-09-03 00:00:00",
                },
                {
                    id: 4,
                    title: "final test message",
                    content: "this is the final **test** message.",
                    notified_at: "2020-09-04 00:00:00",
                },
                {
                    id: 5,
                    title: "continuation test message",
                    content: "this is a continuation **test** message.",
                    notified_at: "2020-09-05 00:00:00",
                },
                {
                    id: 6,
                    title: "additional test message",
                    content: "this is an additional **test** message.",
                    notified_at: "2020-09-06 00:00:00",
                },
                {
                    id: 7,
                    title: "extra test message",
                    content: "this is an extra **test** message.",
                    notified_at: "2020-09-07 00:00:00",
                },
                {
                    id: 8,
                    title: "supplementary test message",
                    content: "this is a supplementary **test** message.",
                    notified_at: "2020-09-08 00:00:00",
                },
                {
                    id: 9,
                    title: "markdown test message",
                    content: "this is a **bold** test message.",
                    notified_at: "2020-09-09 00:00:00",
                },
                {
                    id: 10,
                    title: "italic test message",
                    content: "this is an *italic* test message.",
                    notified_at: "2020-09-10 00:00:00",
                },
                {
                    id: 11,
                    title: "link test message",
                    content: "this is a [link](https://example.com) test message.",
                    notified_at: "2020-09-11 00:00:00",
                },
                {
                    id: 12,
                    title: "image test message",
                    content: "this is an ![image](https://example.com/image.jpg) test message.",
                    notified_at: "2020-09-12 00:00:00",
                },
                {
                    id: 13,
                    title: "code test message",
                    content: "this is a `code` test message.",
                    notified_at: "2020-09-13 00:00:00",
                },
                {
                    id: 14,
                    title: "blockquote test message",
                    content: "this is a > blockquote test message.",
                    notified_at: "2020-09-14 00:00:00",
                },
                {
                    id: 15,
                    title: "list test message",
                    content: "this is a list test message:\n- Item 1\n- Item 2\n- Item 3",
                    notified_at: "2020-09-15 00:00:00",
                }
            ]
        },
        second: {
            total: 21,
            total_page: 2,
            page: 2,
            per_page: 15,
            messages: [
                {
                    id: 16,
                    title: "emoji test message",
                    content: "this is a test message with an emoji: 😊",
                    notified_at: "2020-09-16 00:00:00",
                },
                {
                    id: 17,
                    title: "underline test message",
                    content: "this is an <u>underline</u> test message.",
                    notified_at: "2020-09-17 00:00:00",
                },
                {
                    id: 18,
                    title: "highlight test message",
                    content: "this is a ==highlight== test message.",
                    notified_at: "2020-09-18 00:00:00",
                },
                {
                    id: 19,
                    title: "table test message",
                    content: "this is a table test message:\n\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |",
                    notified_at: "2020-09-19 00:00:00",
                },
                {
                    id: 20,
                    title: "horizontal rule test message",
                    content: "this is a test message with a horizontal rule:\n\n---",
                    notified_at: "2020-09-20 00:00:00",
                },
                {
                    id: 21,
                    title: "horizontal rule test message",
                    content: "this is a test message with a horizontal rule:\n\n---",
                    notified_at: "2020-09-20 00:00:00",
                }
            ]
        }
    },
    getPosts: [
        {
            post_id: 'p1',
            post_url: 'http://baidu.com',
            title: '计算机组成考试题（2023-2024学年）',
            created_by: {
                username: '张奕彤',
                user_id: 'u1',
                user_url: 'http://baidu.com',
            },
            created_at: "2020-09-01 00:00:00",
            likes: 1314,
            dislikes: 223,
            favorites: 123,
            cost: 3,
        }
    ]

}

export default test