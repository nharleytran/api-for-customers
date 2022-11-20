import Client from "../model/Client.js";
import ApiError from "../model/ApiError.js";


class ClientDao {

  // returns the new client data
  // name and email should be defined and nonempty (otherwise, returns an error)
  async create({ name, email }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every client must have a none-empty name!");
    }
    if (email === undefined || email === "") {
      throw new ApiError(400, "Every client must have a valid email!");
    }
    try {
      const client = await Client.create({name, email});
      return client;
    } catch (err) {
      throw new ApiError(400, err.message)
    }
  }

  // clients may not change their email!
  // returns the updated client data
  // returns an error if there is no client with the given ID
  async update(id, { name }) {
    const client = client.findByIdAndUpdate(
        id,
        {name},
        {new : true}
    );
      if (client === null) {
          throw new ApiError(404, "There is no client with the given ID!");
      }
    return client;
  }

  // returns the deleted client data
  // returns an error if there is no client with the given ID
  async delete(id) {
      const client = await Client.findByIdAndDelete(id,)
          .select("-__v");
      if (client === null) {
          throw new ApiError(404, "There is no client with the given ID!");
      }
      return client;
  }

  // returns an empty array if there is no client with the given ID
  async read(id) {
      const client = await Client.findById(id);
      if (client === null) {
          throw new ApiError(404, "There is no client with the given ID!");
      }
      return client;

  }

  // returns an empty array if there is no client in the database
  //  or no client matches the search queries
  async readAll(query = "") {
    const filter = {}

    if (query !== "") {
      if (filter.name === query) {
        filter.name = query;
      }
      if (filter.email === query) {
        filter.email = query;
      }
    }

    const client = await Client.find(filter);
    return client;
  }
}

export default ClientDao;
