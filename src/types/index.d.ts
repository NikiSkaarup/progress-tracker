type PostContents = {
	id: string;
	md: string;
};

type BlogPostPostContents = {
	item: PostContents;
	collection: number;
};

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	snippet: string;
	status: string;
	user_created: string;
	user_updated: string;
	date_created: string;
	date_updated: string;
	post_content: BlogPostPostContents[];
};

type MyCollections = {
	posts: BlogPost;
};
