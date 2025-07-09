import prisma from '../prisma/prismaClient.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        image: true,
        createdAt: true,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        image: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    let imageUrl;
    if (req.file?.path) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
      fs.unlinkSync(req.file.path); // delete temp file
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        age: parseInt(age),
        gender,
        image: imageUrl,
      },
    });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};
