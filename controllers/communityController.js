import Community from '../models/Community.js';
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
        res.status(201).json({ status: true, content: community });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Community creation failed' });
    }
};

export const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.json({ status: true, content: communities });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Unable to fetch communities' });
    }
};

export const getAllMembers = async (req, res) => {
    const { id } = req.params;
    
    try {
        const members = await Member.find({ community: id });
        res.json({ status: true, content: members });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Unable to fetch community members' });
    }
};

export const getMyOwnedCommunity = async (req, res) => {
    try {
        const communities = await Community.find({ owner: req.user.id });
        res.json({ status: true, content: communities });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Unable to fetch owned communities' });
    }
};

export const getMyJoinedCommunity = async (req, res) => {
    try {
        const members = await Member.find({ user: req.user.id });
        const communityIds = members.map(member => member.community);
        const communities = await Community.find({ _id: { $in: communityIds } });
        res.json({ status: true, content: communities });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Unable to fetch joined communities' });
    }
};
