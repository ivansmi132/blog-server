/*
DISCLAIMER:
These tests are outdated and would not work. They are based on an earlier version of the app,
and unfortunately I did not have the time to update them. I included them here because they can serve
an indication that I know how to make tests. I plan to rework them as soon as possible.
 */
class QueryProps {
    page? : string;
    pageSize? : string;
    search? : string;
}

const defaultPosts = [
    {"posts_number":"3"},
    [{"id":1,"title":"First Post","image_url":"https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg"},
        {"id":2,"title":"Second Post","image_url":"https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg"},
        {"id":3,"title":"Third Post","image_url":"https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg"}
    ]];

describe('blog serverside api testing', () => {
    async function fetchAllPosts() {
        const allPosts = await fetch("http://localhost:3001/posts");
        return await allPosts.json();
    }

    it('fetching all posts', async () => {
        const response = await fetch("http://localhost:3001/posts");
        expect(response.status).toBe(200);
        const allPosts = await response.json();
        expect(allPosts).toEqual(defaultPosts);
    })


    it('fetching a single post', async () => {
        const response = await fetch('http://localhost:3001/posts/2');
        expect(response.status).toBe(200);

        const post = await response.json();
        expect(post).toEqual(
            {"id":2,
                "title":"Second Post",
                "content":"This is my second post",
                "image_url":"https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg",
                "creation_date":"2023-01-01T22:00:00.000Z",
                "posted_by":1}
        );
    })

    it('adding a post', async () => {
        const postToSend = {
            title: 'Fourth Post',
            content: 'This is my fourth post',
            image_url: 'https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg',
            posted_by: 1}

        const response = await fetch("http://localhost:3001/posts",
            {method: "POST",
                headers:
                    {"content-type": "application/json"},
                body: JSON.stringify(postToSend)});
        expect(response.status).toBe(201);

        const responseOfPostWithId4 = await fetch('http://localhost:3001/posts/4');
        expect(responseOfPostWithId4.status).toBe(200);

        const postWithId4 = await responseOfPostWithId4.json();
        expect(postWithId4.title).toBe('Fourth Post');
        expect(postWithId4.content).toBe('This is my fourth post');
        expect(postWithId4.image_url).toBe('https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg');
        expect(postWithId4.posted_by).toBe(1);
    })

    it('deleting a post', async() => {
        const response = await fetch('http://localhost:3001/posts/4', {method: "DELETE"})
        expect(response.status).toBe(200);

        const responseOfPostWithId4 = await fetch('http://localhost:3001/posts/4');
        expect(responseOfPostWithId4.status).toBe(400);

        const responseAllPosts = await fetch("http://localhost:3001/posts");
        expect(responseAllPosts.status).toBe(200);
        const allPosts = await responseAllPosts.json();
        expect(allPosts).toEqual(defaultPosts);
    })
})