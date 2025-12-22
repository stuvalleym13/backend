import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    author: { type: String, trim: true },
    category: { type: String, trim: true },
    status: { 
        type: String, 
        enum: ['published', 'draft', 'scheduled'],
        default: 'draft',
        trim: true
    },
    visibility:{ 
        type: String, 
        trim: true,
         enum: ['public', 'members', 'private'],
        default:'public'},
    tags: [String],
    image: { type: String, trim: true },
    isPublished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

BlogPostSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('BlogPost', BlogPostSchema);
export default Blog;

