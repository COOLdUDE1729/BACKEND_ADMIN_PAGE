import * as Joi from 'joi';

export const address : any = Joi.object({
  addressLine1: Joi.string().optional(),
  townORcity: Joi.string().optional(),
  pinCode: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
})
export const userCreation: any = Joi.object({
  name: Joi.string().min(1).presence('required'),
  email: Joi.string().min(1).presence('required'),
  password: Joi.string().min(8).required(),
  clientId: Joi.string().min(1).required(),
  profilePic : Joi.string().optional().allow(null),
  phone_number: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  addressDetails: Joi
    .object({
      addressLine1: Joi.string().optional(),
      townORcity: Joi.string().optional(),
      pinCode: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
    }).optional(),
  paidHolidayRemaining: Joi.string().optional(),
  coverage: Joi.object({
    partial_working_hours: Joi.array()
      .items({
        date: Joi.string(),
        time: Joi.array().allow(null),
      })
      .optional()
      .allow(null),
    holidays: Joi.array()
      .items({
        date: Joi.array(),
        reason: Joi.string(),
      })
      .optional()
      .allow(null),
    working_hours: Joi.object({
      0: Joi.array().items().allow(null),
      1: Joi.array().items().allow(null),
      2: Joi.array().items().allow(null),
      3: Joi.array().items().allow(null),
      4: Joi.array().items().allow(null),
      5: Joi.array().items().allow(null),
      6: Joi.array().items().allow(null),
    })
      .optional()
      .allow(null),
    alternate_working_days: Joi.array().optional().allow(null),
  }),
  role: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional().allow(null),
  timezone: Joi.string().required(),
  language: Joi.array().items(Joi.string()).optional().allow(null),
  paymentDetails: Joi.object({
    bankName: Joi.string().allow(null),
    bankAddress: Joi.string().allow(null),
    accountNumber: Joi.string().allow(null),
    ifscCode: Joi.string().allow(null),
    custId: Joi.string().optional().allow(null),
    paymentMethod: Joi.string().optional().allow(null),
  })
    .optional()
    .allow(null),
  department : Joi.string().optional().allow(null)
});

export const userAdd: any = Joi.object({
  name: Joi.string().min(1).presence('required'),
  email: Joi.string().min(1).presence('required'),
  password: Joi.string().min(8).optional(),
  profilePic : Joi.string().optional().allow(null),
  phone_number: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  addressDetails: Joi
    .object({
      addressLine1: Joi.string().optional(),
      townORcity: Joi.string().optional(),
      pinCode: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
    }).optional(),
  paidHolidayRemaining: Joi.string().optional(),
  coverage: Joi.object({
    partial_working_hours: Joi.array()
      .items({
        date: Joi.string(),
        time: Joi.array().allow(null),
      })
      .optional()
      .allow(null),
    holidays: Joi.array()
      .items({
        date: Joi.array(),
        reason: Joi.string(),
      })
      .optional()
      .allow(null),
    working_hours: Joi.object({
      0: Joi.array().items().allow(null),
      1: Joi.array().items().allow(null),
      2: Joi.array().items().allow(null),
      3: Joi.array().items().allow(null),
      4: Joi.array().items().allow(null),
      5: Joi.array().items().allow(null),
      6: Joi.array().items().allow(null),
    })
      .optional()
      .allow(null),
    alternate_working_days: Joi.array().optional().allow(null),
  }),
  role: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional().allow(null),
  timezone: Joi.string().required(),
  language: Joi.array().items(Joi.string()).optional().allow(null),
  paymentDetails: Joi.object({
    bankName: Joi.string().allow(null),
    bankAddress: Joi.string().allow(null),
    accountNumber: Joi.string().allow(null),
    ifscCode: Joi.string().allow(null),
    custId: Joi.string().optional().allow(null),
    paymentMethod: Joi.string().optional().allow(null),
  })
    .optional()
    .allow(null),
  department : Joi.string().optional().allow(null)
});

export const companyUserUpdate: any = Joi.object({
  userName: Joi.string().min(1).optional(),
  coverage: Joi.object({
    partial_working_hours: Joi.array()
      .items({
        date: Joi.string(),
        time: Joi.array().allow(null),
      })
      .optional()
      .allow(null),
    holidays: Joi.array()
      .items({
        date: Joi.array(),
        reason: Joi.string(),
      })
      .optional()
      .allow(null),
    working_hours: Joi.object({
      0: Joi.array().items().allow(null),
      1: Joi.array().items().allow(null),
      2: Joi.array().items().allow(null),
      3: Joi.array().items().allow(null),
      4: Joi.array().items().allow(null),
      5: Joi.array().items().allow(null),
      6: Joi.array().items().allow(null),
    })
      .optional()
      .allow(null),
    alternate_working_days: Joi.array().optional().allow(null),
  }),
  role: Joi.string(),
  timezone: Joi.string().required(),
  paymentDetails: Joi.object({
    bankName: Joi.string().allow(null),
    bankAddress: Joi.string().allow(null),
    accountNumber: Joi.string().allow(null),
    ifscCode: Joi.string().allow(null),
    custId: Joi.string().optional().allow(null),
    paymentMethod: Joi.string().optional().allow(null),
  })
    .optional()
    .allow(null),
  department : Joi.string().optional().allow(null)
});

export const userUpdate: any = Joi.object({
  profilePic : Joi.string().allow(null),
  phone_number: Joi.string().allow(null),
  password: Joi.string().min(8).optional(),
  skills: Joi.array().items(Joi.string()).optional().allow(null),
  language: Joi.array().items(Joi.string()).optional().allow(null),
  addressDetails: Joi
    .object({
      addressLine1: Joi.string().optional(),
      townORcity: Joi.string().optional(),
      pinCode: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
    }).optional(),
  dateOfBirth: Joi.date().optional(),
});
