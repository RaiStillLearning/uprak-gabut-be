const Employee = require("../models/employeeModel");

// ✅ GET ALL + SEARCH + PAGINATION
exports.getEmployees = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      $or: [
        { nama: { $regex: search, $options: "i" } },
        { nik: { $regex: search, $options: "i" } },
        { jabatan: { $regex: search, $options: "i" } },
      ],
    };

    const skip = (Number(page) - 1) * Number(limit);

    const data = await Employee.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Employee.countDocuments(query);

    res.json({
      data,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET BY ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CREATE
exports.createEmployee = async (req, res) => {
  try {
    const { nik, nama, jabatan, gaji } = req.body

    // ✅ CEK DUPLIKAT NIK
    const existing = await Employee.findOne({ nik })
    if (existing) {
      return res.status(400).json({
        message: "NIK sudah terdaftar!",
      })
    }

    const employee = await Employee.create({
      nik,
      nama,
      jabatan,
      gaji,
      createdBy: "admin",
    })

    res.status(201).json({
      message: "Employee berhasil ditambahkan",
      data: employee,
    })

  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan employee",
      error: error.message,
    })
  }
}

// ✅ UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const { nik, nama, jabatan, gaji, updatedBy } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.nik = nik ?? employee.nik;
    employee.nama = nama ?? employee.nama;
    employee.jabatan = jabatan ?? employee.jabatan;
    employee.gaji = gaji ?? employee.gaji;
    employee.updatedBy = updatedBy || "system";

    const updated = await employee.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.deleteOne();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
