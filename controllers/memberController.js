import Member from '../models/Member.js';
import { snowflakeId } from '../utils/snowflake.js';

export const addMember = async (req, res) => {
    const { communityId, userId, role } = req.body;
    
    try {
        const member = await Member.create({
            _id: snowflakeId(), 
            community: communityId,
            user: userId,
            role,
        });
        res.status(201).json({ status: true, content: member });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Failed to add member' });
    }
};

export const removeMember = async (req, res) => {
    const { id } = req.params;
    
    try {
        const member = await Member.findByIdAndDelete(id);
        if (!member) return res.status(404).json({ status: false, error: 'Member not found' });
        
        res.json({ status: true, content: 'Member removed' });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Failed to remove member' });
    }
};
