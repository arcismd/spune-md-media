import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5);

        res.json(tags);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Nu există taguri',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Nu există articole',
        });
    }
};


export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 },
        }, {
            returnDocument: 'after',
        },
        (err, doc) => {
            if (err) {
                console.log(error)
                return res.status(500).json({
                    message: 'Articolul nu poate fi găsit',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Articolul nu există',
                });
            };

            res.json(doc);
        },
        
        ).populate('user');

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Articolul nu există',
        });
    }
};


export const remove = async (req, res) => {
   try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
        _id: postId,
    }, (err, doc) => {
        if (err) {
            console.log(error)
            return res.status(500).json({
                message: 'Articolul nu poate fi șters',
            });
        }

        if (!doc) {
            return res.status(404).json({
                message: 'Articolul nu există',
            });
        }

        res.json({
            success: true,
        });
    },
    );

   } catch (error) {
    
   }
};


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            mainText: req.body.mainText,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Crarea articolului nu a reușit',
        });
    }
};

export const update = async (req, res) => {
   try {
    const postId = req.params.id;

    await PostModel.updateOne({
        _id: postId
    }, {
        title: req.body.title,
        text: req.body.text,
        mainText: req.body.mainText,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
    },);

    res.json({
        success: true
    })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Articolul nu poate fi reînnoit',
        });
   } 
};