import Role from '../models/Role.js';
import { snowflakeId } from '../utils/snowflake.js';

export const createRole = async (req, res) => {
    const { name } = req.body;
    
    try {
        const role = await Role.create({
            _id: snowflakeId(), 
            name,
        });
        res.status(201).json({ status: true, content: role });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Role creation failed' });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json({ status: true, content: roles });
    } catch (err) {
        res.status(400).json({ status: false, error: 'Unable to fetch roles' });
    }
};
