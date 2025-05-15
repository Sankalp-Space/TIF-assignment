import Member from '../models/Member.js';
import Community from '../models/Community.js';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { snowflakeId } from '../utils/snowflake.js';

export const addMember = async (req, res) => {
    const { community: communityId, user: userId, role: roleId } = req.body;

    try {
        const community = await Community.findById(communityId);
        const user = await User.findById(userId);
        const role = await Role.findById(roleId);

        if (!community || !user || !role) {
            return res.status(404).json({ status: false, error: 'Community, User, or Role not found' });
        }

        const existingMember = await Member.findOne({ community: communityId, user: userId });
        if (existingMember) {
            return res.status(409).json({ status: false, error: 'User is already a member of this community' });
        }

        if (community.owner.toString() !== req.user.id) {
            return res.status(403).json({ status: false, error: 'Only the community owner can add members' });
        }

        const member = await Member.create({
            _id: snowflakeId(),
            community: communityId,
            user: userId,
            role: roleId,
        });
        res.status(201).json({ status: true, content: { member } });
    } catch (err) {
        console.error('Error adding member:', err);
        res.status(400).json({ status: false, error: 'Failed to add member', details: err.message });
    }
};

export const removeMember = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findById(id).populate('community');
        if (!member) {
            return res.status(404).json({ status: false, error: 'Member not found' });
        }
        if (member.community.owner.toString() !== req.user.id) {
            return res.status(403).json({ status: false, error: 'Only the community owner can remove members' });
        }

        await Member.findByIdAndDelete(id);
        res.json({ status: true, content: { member: { id } } });
    } catch (err) {
        console.error('Error removing member:', err);
        res.status(400).json({ status: false, error: 'Failed to remove member', details: err.message });
    }
};