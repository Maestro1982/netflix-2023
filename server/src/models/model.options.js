/* toJSON and toObject is for delete _id in result
   versionKey: false is for remove _v in result
   timestamps: true is for add createdAt and updatedAt in result */
const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false,
  timestamps: true,
};

export default modelOptions;
