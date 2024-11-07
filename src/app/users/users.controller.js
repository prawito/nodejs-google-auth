import * as userRepository from "./users.repository.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await userRepository.createUser({ name, email });
    if (result) {
      const data = {
        code: 200,
        message: "Success",
        data: result,
      };
      res.json(data);
    }
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await userRepository.getAllUsers();
    if (result) {
      const data = {
        code: 200,
        message: "Success",
        data: result,
      };
      res.json(data);
    }
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userRepository.getUserById(id);
    if (result) {
      const data = {
        code: 200,
        message: "Success",
        data: result,
      };
      res.json(data);
    }
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await userRepository.updateUser(id, { name, email });
    if (result) {
      const data = {
        code: 200,
        message: "Success",
        data: result,
      };
      res.json(data);
    }
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userRepository.deleteUser(id);
    if (result) {
      const data = {
        code: 200,
        message: "Success",
        data: result,
      };
      res.json(data);
    }
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
};
