import Community from '../models/Community.js';
import Member from '../models/Member.js';
import Role from '../models/Role.js';
import User from '../models/User.js';
import { snowflakeId } from '../utils/snowflake.js';

export const createCommunity = async (req, res) => {
    const { name, slug } = req.body;

    try {
        const community = await Community.create({
            _id: snowflakeId(),
            name,
            slug,
            owner: req.user.id,
        });

        // Assign Community Admin role to the creator
        const adminRole = await Role.findOne({ name: 'Community Admin' });
        if (adminRole) {
            await Member.create({
                _id: snowflakeId(),
                community: community._id,
                user: req.user.id,
                role: adminRole._id,
            });
        } else {
            console.warn("Community Admin role not found, creator not assigned as admin.");
        }

        res.status(201).json({ status: true, content: { community } });
    } catch (err) {
        console.error("Create community error:", err);
        res.status(400).json({ status: false, error: 'Community creation failed', details: err.message });
    }
};

export const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.json({ status: true, content: { communities } });
    } catch (err) {
        console.error("Get all communities error:", err);
        res.status(400).json({ status: false, error: 'Unable to fetch communities', details: err.message });
    }
};

export const getAllMembers = async (req, res) => {
    const { id } = req.params;

    try {
        const members = await Member.find({ community: id })
            .populate({ path: 'user', select: 'name _id' })
            .populate({ path: 'role', select: 'name _id' });
        res.json({ status: true, content: { members } });
    } catch (err) {
        console.error("Get all members error:", err);
        res.status(400).json({ status: false, error: 'Unable to fetch community members', details: err.message });
    }
};

export const getMyOwnedCommunity = async (req, res) => {
    try {
        const communities = await Community.find({ owner: req.user.id });
        res.json({ status: true, content: { communities } });
    } catch (err) {
        console.error("Get my owned communities error:", err);
        res.status(400).json({ status: false, error: 'Unable to fetch owned communities', details: err.message });
    }
};

export const getMyJoinedCommunity = async (req, res) => {
    try {
        const members = await Member.find({ user: req.user.id }).populate('community');
        const communities = members.map(member => member.community);
        res.json({ status: true, content: { communities } });
    } catch (err) {
        console.error("Get my joined communities error:", err);
        res.status(400).json({ status: false, error: 'Unable to fetch joined communities', details: err.message });
    }
};
