import {Schema, model, Document} from "mongoose";

interface IComment {
    name: string,
    email: string,
    comment: String,
    date: Date
}

interface IPost extends Document {
    title: string;
    shortId: string;
    subTitle: string;
    imageLocate: string;
    content: string;
    categoryId?: Schema.Types.ObjectId[];
    readerCount: number;
    comments?: IComment[];
    relatedPosts?: Schema.Types.ObjectId[];
    tags?: string[];
    rate?: number;
    date: Date;
}

const blogScheme = new Schema<IPost>({
	title: {
		type: String,
		required: [true, "Cannot be empty"]
	},
	shortId: {
		type: String,
		unique: true,
	},
	subTitle: {
		type: String,
		required: [true, "Cannot be empty"]
	},
	imageLocate: {
		type: String,
		required: [true, "Cannot be empty"]
	},
	content: {
		type: String,
		required: [true, "Cannot be empty"]
	},
	categoryId: [
		{
			type: Schema.Types.ObjectId,
			ref: "Categories"
		}
	],
	readerCount: {
		type: Number,
		default: 0,
	},
	comments: [
		{
			name: {
				type: String,
				required: "Boş Geçilmez"
			},
			email: {
				type: String,
				required: "Boş Geçilmez"
			},
			comment: {
				type: String,
				required: "Boş Geçilmez"
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	relatedPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Blog"
		}
	],
	tags: [
		{
			type: String
		}
	],
	rate: {
		type: Number,
		default: 0,
	},
	date: {
		type: Date,
		default: new Date()
	},
});

module.exports = model("blog", blogScheme, "blog");