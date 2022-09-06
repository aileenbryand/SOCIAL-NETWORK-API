const { User, Thought } = require("../models");

const thoughtController = {
    // Get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    // Get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    // Create Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            }
            )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch((err) => res.status(400).json(err));
    },

    // Update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch((err) => res.status(400).json(err));
    },

    // Delete Thought

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            }
            )

            .catch((err) => res.status(400).json(err));
    },

    // Add Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch((err) => res.status(400).json(err));
    },

    // Delete Reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;
