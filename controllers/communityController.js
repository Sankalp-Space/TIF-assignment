import Community from '../models/Community.js';
import { generateSnowflakeId } from '../utils/snowflake.js';

export const createCommunity = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const community = await Community.create({
      id: generateSnowflakeId(),
      name,
      slug,
      owner: req.user.id,
    });
    res.status(201).json({ status: true, content: community });
  } catch (err) {
    res.status(400).json({ status: false, error: 'Community creation failed' });
  }
};

export const getAllCommunities = async (req, res) => {
  const communities = await Community.find();
  res.json({ status: true, content: communities });
};