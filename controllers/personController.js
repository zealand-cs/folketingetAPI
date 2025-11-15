const Person = require("../models/person");
const { personSchema } = require("../validation/personValidation");
const logger = require("../logger");


exports.getAll = async (req, res) => {
    try {
        const persons = await Person.find();
        logger.info("Fetched all persons");
        res.json(persons);
    } catch (err) {
        logger.error("Error fetching persons: " + err.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.getOne = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            logger.warn("Person not found: " + req.params.id);
            return res.status(404).json({ error: "Person not found" });
        }
        logger.info("Fetched person: " + person.name);
        res.json(person);
    } catch (err) {
        logger.error("Error fetching person: " + err.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.create = async (req, res) => {
    
    const { error } = personSchema.validate(req.body);
    if (error) {
        logger.warn("Validation failed for create: " + error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const newPerson = new Person(req.body);
        await newPerson.save();
        logger.info("Created new person: " + newPerson.name);
        res.status(201).json(newPerson);
    } catch (err) {
        logger.error("Create error: " + err.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.update = async (req, res) => {
    
    const { error } = personSchema.validate(req.body);
    if (error) {
        logger.warn("Validation failed for update: " + error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!person) {
            logger.warn("Update failed — person not found: " + req.params.id);
            return res.status(404).json({ error: "Person not found" });
        }

        logger.info("Updated person: " + person.name);
        res.json(person);
    } catch (err) {
        logger.error("Update error: " + err.message);
        res.status(500).json({ error: "Server error" });
    }
};


exports.delete = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);

        if (!person) {
            logger.warn("Delete failed — person not found: " + req.params.id);
            return res.status(404).json({ error: "Person not found" });
        }

        logger.info("Deleted person: " + person.name);
        res.json({ message: "Person deleted successfully" });
    } catch (err) {
        logger.error("Delete error: " + err.message);
        res.status(500).json({ error: "Server error" });
    }
};