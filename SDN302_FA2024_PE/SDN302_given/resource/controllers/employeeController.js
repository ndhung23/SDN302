const Employee = require('../models/Employee');
const Department = require('../models/Department');

exports.listAllEmployees = async (req,res) => {
    try {
        const employees = await Employee.find().populate('department');
        const formattedEmployees = employees.map(e => ({
            employeeId: e._id,
            fullName: [e.name?.fistName,e.name?.middleName,e.name?.lastName].filter(Boolean).join(' '),
            dob: e.dateOfBirth,
            gender: e.gender,
            email: e.account?.email,
            department: e.department?.name || '',
            manager: e.manager || '',
            dependents: e.dependents?.map(d => ({
                name: d.fullname,
                relation: d.relation
            })) || [],
        }))
        return res.status(200).json(formattedEmployees);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// exports.listAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find().populate('department');

//     // Tạo Map để lookup tên Manager nhanh chóng từ id/chuỗi lưu ở field manager
//     const allEmployees = await Employee.find();
//     const managerMap = new Map();
//     allEmployees.forEach(emp => {
//       const full = [emp.name?.fistName, emp.name?.middleName, emp.name?.lastName]
//         .filter(Boolean)
//         .join(' ');
//       managerMap.set(emp._id.toString(), full);
//     });

//     const result = employees.map(emp => {
//       const fullName = [emp.name?.fistName, emp.name?.middleName, emp.name?.lastName]
//         .filter(Boolean)
//         .join(' ');

//       // Kiểm tra giá trị manager: nếu là ID tồn tại thì lấy họ tên, nếu không giữ rỗng/tên chuỗi
//       let managerName = '';
//       if (emp.manager) {
//         managerName = managerMap.get(emp.manager.toString()) || emp.manager;
//       }

//       return {
//         employeeId: emp._id,
//         fullName: fullName,
//         dob: emp.dateOfBirth,
//         gender: emp.gender,
//         email: emp.account?.email || '',
//         department: emp.department?.name || '',
//         manager: managerName,
//         dependents: (emp.dependents || []).map(dep => ({
//           name: dep.fullname,
//           relation: dep.relation
//         }))
//       };
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };