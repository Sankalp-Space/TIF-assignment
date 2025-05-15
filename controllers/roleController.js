import Role from '../models/Role.js';
import { snowflakeId } from '../utils/snowflake.js';

export const createRole = async (req, res) => {
    let { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ status: false, error: 'Role name is required and must be a non-empty string' });
    }

    name = name.trim();

    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(409).json({ status: false, error: 'Role name already exists' });
        }

        const role = await Role.create({
            _id: snowflakeId(),
            name,
        });
        res.status(201).json({ status: true, content: { role } });
    } catch (err) {
        console.error('Error creating role:', err);
        res.status(400).json({ status: false, error: 'Role creation failed', details: err.message });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json({ status: true, content: { roles } });
    } catch (err) {
        console.error('Error fetching roles:', err);
        res.status(400).json({ status: false, error: 'Unable to fetch roles', details: err.message });
    }
};
