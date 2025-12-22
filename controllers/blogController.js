import Blog from '../modals/BlogPostModals.js';
import User from '../modals/userModals.js';

export const create = async (req, res) => {
    try {
        const {
            authorId,
            title,
            slug,
            content,
            excerpt,
            author,
            category,
            tags,
            image,
            isPublished
        } = req.body;


        console.log(req.body)

        console.log("user data with _id",req.user);


        // Validate required fields
        if (!title || !slug || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title, slug, and content are required fields'
            });
        }

        // Check if slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return res.status(409).json({
                success: false,
                message: 'Blog post with this slug already exists'
            });
        }

        // Create new blog post
        const newBlog = new Blog({
            title: title.trim(),
            slug: slug.trim(),
            content,
            excerpt: excerpt?.trim(),
            author: author?.trim() ||'Akhilesh',
            category: category?.trim(),
            tags: Array.isArray(tags) ? tags : [],
            image: image?.trim(),
            isPublished: isPublished || false
        });

        // Save to database
        const savedBlog = await newBlog.save();

        console.log(savedBlog._id);
        const user = await User.findById(authorId);
        console.log("user:",user);
        user.blogPosts.push(savedBlog._id)

        user.save();



        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: savedBlog
        });

    } catch (error) {
        console.error('Error creating blog post:', error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Handle duplicate key errors (for unique slug)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Blog post with this slug already exists'
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: 'Internal server error while creating blog post'
        });
    }
};

export const getAllposts = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).select("title excerpt category author tags status, visibility");
        res.status(200).json({
            success: true,
            blogs: blogs
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching blog posts'
        });
    }
};





// Additional controller functions you might need:

export const getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog post'
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Remove slug from update data if present (to prevent changing slug)
        if (updateData.slug) {
            delete updateData.slug;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating blog post'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog post'
        });
    }
};