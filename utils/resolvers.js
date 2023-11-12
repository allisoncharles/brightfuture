import User from "../models/User";
import Result from "../models/Result";
import Featured from "../models/Featured";
import News from "../models/News";
import Event from "../models/Event";
import Face from "../models/Face";
import Gallery from "../models/Gallery";
import Setting from "../models/Setting";
import jwt from "jsonwebtoken";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const resolvers = {
  Query: {
    async getUserResult(_parent, args, context) {
      const { regno, session, passcode } = args.result;
      try {
        const userRes = await User.findOne({ regno });
        if (userRes.passcode != passcode) return;

        const response = await Result.find({
          regno: regno,
          session: session,
        });
        return response;
      } catch (err) {
        return new Error("Passcode not valid");
      }
    },

    async getAllUsers() {
      const users = await User.find({});
      return users;
    },

    async getUser(_parent, args) {
      const { regno } = args;
      const user = await User.findOne({ regno });
      return user;
    },

    async getAllSettings() {
      const settings = await Setting.find({});
      return settings;
    },

    async getCateResult(_parent, args) {
      const { term, session } = args.result;

      try {
        const results = await Result.find({ term, session });
        return results;
      } catch (err) {
        return err;
      }
    },

    async getResult(_parent, args) {
      const { regno, term, session } = args.result;
      try {
        const result = await Result.findOne({ regno, term, session });
        return result;
      } catch (err) {
        return err;
      }
    },

    async getAllResults(_parent, _args) {
      return await Result.find({});
    },

    async getAllFeatured(_parent, _args) {
      return await Featured.find({});
    },

    async getFeatured(_parent, args) {
      const { _id } = args;
      return await Featured.findOne({ _id });
    },

    async getAllNews(_parent, _args) {
      return await News.find({});
    },

    async getNews(_parent, args) {
      const { _id } = args;
      return await News.findOne({ _id });
    },

    async getAllEvent(_parent, _args) {
      return await Event.find({});
    },

    async getEvent(_parent, args) {
      const { _id } = args;
      return await Event.findOne({ _id });
    },

    async getAllGallery(_parent, _args) {
      return await Gallery.find({});
    },

    async getGallery(_parent, args) {
      const { _id } = args;
      return await Gallery.findOne({ _id });
    },

    async getAllFace(_parent, _args) {
      return await Face.find({});
    },

    async getFace(_parent, args) {
      const { _id } = args;
      return await Face.findOne({ _id });
    },
  },

  Mutation: {
    async createUser(_parent, args, context) {
      const {
        name,
        regno,
        email,
        profileImg,
        role,
        class: classroom,
        arm,
      } = args.user;
      console.log(args.user);
      try {
        const response = await User.findOne({ regno });
        if (response) return;
        const randomLetter = alphabet.charAt(Math.random() * (9 - 1) + 1);
        const passcode = `${Math.random()
          .toString()
          .slice(2, 9)}${randomLetter}`;
        const newUser = new User({
          name,
          regno: regno.toLowerCase(),
          email: email.toLowerCase(),
          passcode,
          class: classroom,
          arm,
          profileImg,
          role,
        });
        return await newUser.save();
      } catch (err) {
        throw new Error("User already exist");
      }
    },

    async deleteUser(_parent, args, context) {
      const { regno } = args;
      try {
        const foundUser = await User.findOne({ regno });
        if (!foundUser) return;
        await User.deleteOne({ regno });
        return `User with regno ${regno} deleted`;
      } catch (err) {
        return new Error("User not found!");
      }
    },

    async loginUser(parent, args, { req, res }) {
      const { regno, passcode } = args.user;
      try {
        const user = await User.findOne({ regno });
        if (user.role !== "admin") return;

        if (user.passcode !== passcode) return;

        const access_token = jwt.sign(
          {
            regno,
            role: user.role,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2h" }
        );

        return { user: user._doc, access_token };
      } catch (err) {
        throw new Error("Invalid Username or Passcode");
      }
    },

    async updateUser(_parent, args) {
      const { regno, user } = args;
      try {
        const updatedUser = await User.findOne({ regno });
        for (const [key, value] of Object.entries(user)) {
          updatedUser[key] = user[key];
        }
        await updatedUser.save();
        return updatedUser;
      } catch (err) {
        throw new Error("User does not exist");
      }
    },

    async createSetting(_parent, args) {
      const { setting } = args;
      const { session } = setting;
      try {
        const found = await Setting.findOne({ session });
        if (found) return;
        const newSetting = new Setting(setting);
        return await newSetting.save();
      } catch (err) {
        return err;
      }
    },

    async deleteSetting(_parent, args) {
      const { _id } = args;
      try {
        const found = await Setting.findOne({ _id });
        if (!found) return;
        await Setting.deleteOne({ _id });
        return `Session with id ${_id} deleted`;
      } catch (err) {
        return new Error(`Session doesn't exist`);
      }
    },

    async uploadUsers(_parent, args) {
      const { users } = args;
      const { regno } = users[0];
      try {
        const found = await User.findOne({ regno });
        if (found) return;

        users.map((user) => {
          const randomLetter = alphabet.charAt(Math.random() * (9 - 1) + 1);
          const passcode = `${Math.random()
            .toString()
            .slice(2, 9)}${randomLetter}`;
          user["passcode"] = passcode;
        });
        const res = await User.insertMany(users);
        return res;
      } catch (err) {
        return new Error("Users already exists");
      }
    },

    async deleteResult(_parent, args) {
      const { regno, term, session } = args;
      try {
        const foundResult = await Result.findOne({
          regno,
          term,
          session,
        });

        if (!foundResult) return;

        await Result.deleteOne({
          regno,
          term,
          session,
        });
        return `Result deleted`;
      } catch (err) {
        return err;
      }
    },

    async uploadResult(_parent, args) {
      const { result } = args;
      const { regno, term, session } = result[0];
      const found = await Result.findOne({ regno, term, session });
      if (found) return;
      const res = await Result.insertMany(result);
      return res;
    },

    async createResult(_parent, args) {
      const { result } = args;
      const newResult = new Result(result);
      await newResult.save();
      return newResult;
    },

    async updateResult(parent, args) {
      const { regno, result } = args;
      const response = await Result.findOne({ regno });
      const updatedResult = response;

      if (Object.keys(result).length === 0) return;

      for (const [key, value] of Object.entries(result)) {
        if (key == "subjects") {
          for (const [key1, value1] of Object.entries(result.subjects)) {
            for (const [key2, value2] of Object.entries(value1)) {
              updatedResult.subjects[key1][key2] = value2;
            }
          }
        } else {
          updatedResult[key] = result[key];
        }
      }

      return await updatedResult.save();
    },

    async createFeatured(parent, args) {
      const { featured } = args;
      const newFeatured = new Featured(featured);
      return await newFeatured.save();
    },

    async updateFeatured(_parent, args) {
      const { _id, featured } = args;
      const updatedFeatured = await Featured.findById(_id);
      for (const [key, value] of Object.entries(featured)) {
        updatedFeatured[key] = featured[key];
      }
      return await updatedFeatured.save();
    },

    async deleteFeatured(_parent, args) {
      const { _id } = args;
      try {
        const foundFeatured = await Featured.findOne({ _id });
        if (foundFeatured) await Featured.deleteOne({ _id });
        return `featured with id ${_id} deleted`;
      } catch (err) {
        throw new Error(`Featured Image doesnt exist`);
      }
    },

    async createNews(parent, args) {
      const { news } = args;
      const newNews = new News(news);
      return await newNews.save();
    },

    async updateNews(parent, args) {
      const { _id, news } = args;
      const updatedNews = await News.findById(_id);
      for (const [key, value] of Object.entries(news)) {
        updatedNews[key] = news[key];
      }
      return await updatedNews.save();
    },

    async deleteNews(_parent, args) {
      const { _id } = args;
      try {
        const foundNews = await News.findOne({ _id });
        if (foundNews) await News.deleteOne({ _id });
        return `News with id ${_id} deleted`;
      } catch (err) {
        throw new Error(`News doesnt exist`);
      }
    },

    async createGallery(parent, args) {
      const { gallery } = args;
      const newGallery = new Gallery(gallery);
      return await newGallery.save();
    },

    async updateGallery(parent, args) {
      const { _id, gallery } = args;
      const updatedGallery = await Gallery.findById(_id);
      for (const [key, value] of Object.entries(gallery)) {
        updatedGallery[key] = gallery[key];
      }
      return await updatedGallery.save();
    },

    async deleteGallery(_parent, args) {
      const { _id } = args;
      try {
        const foundGallery = await Gallery.findOne({ _id });
        if (foundGallery) await Gallery.deleteOne({ _id });
        return `Gallery with id ${_id} deleted`;
      } catch (err) {
        throw new Error(`Gallery doesnt exist`);
      }
    },

    async createFace(parent, args) {
      const { face } = args;
      const newFace = new Face(face);
      return await newFace.save();
    },

    async updateFace(parent, args) {
      const { _id, face } = args;
      const updatedFace = await Face.findById(_id);
      for (const [key, value] of Object.entries(face)) {
        updatedFace[key] = face[key];
      }
      return await updatedFace.save();
    },

    async deleteFace(_parent, args) {
      const { _id } = args;
      try {
        const foundFace = await Face.findOne({ _id });
        if (foundFace) await Face.deleteOne({ _id });
        return `Face with id ${_id} deleted`;
      } catch (err) {
        throw new Error(`Face doesnt exist`);
      }
    },

    async createEvent(_parent, args) {
      const { event } = args;
      const newEvent = new Event(event);
      return await newEvent.save();
    },

    async updateEvent(parent, args) {
      const { _id, event } = args;
      const updatedEvent = await Event.findById(_id);
      for (const [key, value] of Object.entries(event)) {
        updatedEvent[key] = event[key];
      }
      return await updatedEvent.save();
    },

    async deleteEvent(_parent, args) {
      const { _id } = args;
      try {
        const foundEvent = await Event.findOne({ _id });
        if (foundEvent) await Event.deleteOne({ _id });
        return `Event with id ${_id} deleted`;
      } catch (err) {
        throw new Error(`Event doesnt exist`);
      }
    },
  },

  ResultType: {
    async user(result, _args) {
      const { regno } = result;
      const res = await User.findOne({ regno });
      return res;
    },
  },
};

export default resolvers;
