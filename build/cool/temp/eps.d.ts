declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门名称
		 */
		name?: string;
		/**
		 * 上级部门ID
		 */
		parentId?: BigInt;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 行为
		 */
		action?: string;
		/**
		 * ip
		 */
		ip?: string;
		/**
		 * ip地址
		 */
		ipAddr?: string;
		/**
		 * 参数
		 */
		params?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 父菜单ID
		 */
		parentId?: BigInt;
		/**
		 * 菜单名称
		 */
		name?: string;
		/**
		 * 菜单地址
		 */
		router?: string;
		/**
		 * 权限标识
		 */
		perms?: string;
		/**
		 * 类型 0：目录 1：菜单 2：按钮
		 */
		type?: number;
		/**
		 * 图标
		 */
		icon?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 视图地址
		 */
		viewPath?: string;
		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;
		/**
		 * 是否显示
		 */
		isShow?: boolean;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 键位
		 */
		keyName?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 数据类型 0:字符串 1：数组 2：键值对
		 */
		dataType?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 角色标签
		 */
		label?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 用户名
		 */
		username?: string;
		/**
		 * 密码
		 */
		password?: string;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;
		/**
		 * 昵称
		 */
		nickName?: string;
		/**
		 * 头像
		 */
		headImg?: string;
		/**
		 * 手机
		 */
		phone?: string;
		/**
		 * 邮箱
		 */
		email?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:禁用 1：启用
		 */
		status?: boolean;
		/**
		 * socketId
		 */
		socketId?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysYardEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CarEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * Customer ID
		 */
		customerID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * Car name
		 */
		name?: string;
		/**
		 * year
		 */
		year?: number;
		/**
		 * brand
		 */
		brand?: string;
		/**
		 * model
		 */
		model?: string;
		/**
		 * colour
		 */
		colour?: string;
		/**
		 * image
		 */
		image?: string;
		/**
		 * vinNumber
		 */
		vinNumber?: string;
		/**
		 * Series
		 */
		series?: string;
		/**
		 * registrationNumber
		 */
		registrationNumber?: string;
		/**
		 * state
		 */
		state?: string;
		/**
		 * body Style
		 */
		bodyStyle?: string;
		/**
		 * engine
		 */
		engine?: string;
		/**
		 * door number
		 */
		doors?: number;
		/**
		 * Seats number
		 */
		seats?: number;
		/**
		 * fuelType
		 */
		fuelType?: number;
		/**
		 * engineSizeCc
		 */
		engineSizeCc?: number;
		/**
		 * cylinders
		 */
		cylinders?: number;
		/**
		 * Length
		 */
		length?: number;
		/**
		 * Width
		 */
		width?: number;
		/**
		 * Height
		 */
		height?: number;
		/**
		 * TareWeight
		 */
		tareWeight?: number;
		/**
		 * status
		 */
		status?: boolean;
		/**
		 * Plates returned
		 */
		platesReturned?: boolean;
		/**
		 * Registered
		 */
		registered?: boolean;
		/**
		 * identificationSighted
		 */
		identificationSighted?: boolean;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * ID
		 */
		theCustomer?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CarBodyEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * Car ID
		 */
		carID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * QrCode
		 */
		qrCode?: string;
		/**
		 * Price
		 */
		price?: number;
		/**
		 * weight
		 */
		weight?: number;
		/**
		 * weight
		 */
		unitPrice?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CarCatalyticConverterEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * Car ID
		 */
		carID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * QrCode
		 */
		qrCode?: string;
		/**
		 * Price
		 */
		price?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CarEngineEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * Car ID
		 */
		carID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * QrCode
		 */
		qrCode?: string;
		/**
		 * Price
		 */
		price?: number;
		/**
		 * weight
		 */
		engineSizeCc?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CarRegEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * RegistrationNumber
		 */
		registrationNumber?: string;
		/**
		 * state
		 */
		state?: string;
		/**
		 * xml
		 */
		xml?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerProfileEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * user name
		 */
		firstName?: string;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * user name
		 */
		surname?: string;
		/**
		 * Email Address
		 */
		emailAddress?: string;
		/**
		 * phone Number
		 */
		phoneNumber?: string;
		/**
		 * address
		 */
		address?: string;
		/**
		 * licence
		 */
		licence?: string;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 图片
		 */
		pic?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 分类 0-衣服 1-鞋子 2-裤子
		 */
		type?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类型ID
		 */
		typeId?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 父ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 标识
		 */
		key?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface JobEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * carID
		 */
		orderID?: number;
		/**
		 * driverID
		 */
		driverID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * status
		 */
		status?: boolean;
		/**
		 * schedulerStart
		 */
		schedulerStart?: string;
		/**
		 * schedulerEnd
		 */
		schedulerEnd?: string;
		/**
		 * 实际 start time
		 */
		start?: timestamp;
		/**
		 * 实际 end time
		 */
		end?: timestamp;
		/**
		 * isAccept
		 */
		isAccept?: boolean;
		/**
		 * note
		 */
		note?: string;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface OrderActionEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * timestamp
		 */
		timestamp?: string;
		/**
		 * name
		 */
		name?: string;
		/**
		 * description
		 */
		description?: string;
		/**
		 * author
		 */
		authorID?: number;
		/**
		 * orderID
		 */
		orderID?: number;
		/**
		 * type
		 */
		type?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface OrderInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * carID
		 */
		carID?: number;
		/**
		 * yardID
		 */
		yardID?: number;
		/**
		 * customer
		 */
		customerID?: string;
		/**
		 * driverID
		 */
		driverID?: string;
		/**
		 * status
		 */
		status?: boolean;
		/**
		 * OverrideEmailAddress
		 */
		overrideEmailAddress?: string;
		/**
		 * pickupAddress
		 */
		pickupAddress?: string;
		/**
		 * payMethod
		 */
		payMethod?: string;
		/**
		 * overridePhoneNumber
		 */
		overridePhoneNumber?: string;
		/**
		 * recommendedPrice
		 */
		recommendedPrice?: number;
		/**
		 * ActualPaymentPrice
		 */
		actualPaymentPrice?: number;
		/**
		 * expectedDate
		 */
		expectedDate?: string;
		/**
		 * note
		 */
		note?: string;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 地址
		 */
		url?: string;
		/**
		 * 类型
		 */
		type?: string;
		/**
		 * 分类ID
		 */
		classifyId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类别名称
		 */
		name?: string;
		/**
		 * 父分类ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 任务ID
		 */
		jobId?: string;
		/**
		 * 任务配置
		 */
		repeatConf?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * cron
		 */
		cron?: string;
		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;
		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:停止 1：运行
		 */
		status?: boolean;
		/**
		 * 开始时间
		 */
		startDate?: Date;
		/**
		 * 结束时间
		 */
		endDate?: Date;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 执行的service实例ID
		 */
		service?: string;
		/**
		 * 状态 0:系统 1：用户
		 */
		type?: number;
		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;
		/**
		 * 状态 0:cron 1：时间间隔
		 */
		taskType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface VehicleProfileEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * Car name
		 */
		name?: string;
		/**
		 * year
		 */
		year?: number;
		/**
		 * brand
		 */
		brand?: string;
		/**
		 * model
		 */
		model?: string;
		/**
		 * Series
		 */
		series?: string;
		/**
		 * body Style
		 */
		bodyStyle?: string;
		/**
		 * door number
		 */
		doors?: number;
		/**
		 * Seats number
		 */
		seats?: number;
		/**
		 * fuelType
		 */
		fuelType?: number;
		/**
		 * engineSizeCc
		 */
		engineSizeCc?: number;
		/**
		 * cylinders
		 */
		cylinders?: number;
		/**
		 * Length
		 */
		length?: number;
		/**
		 * Width
		 */
		width?: number;
		/**
		 * Height
		 */
		height?: number;
		/**
		 * TareWeight
		 */
		tareWeight?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}
	interface ChatMessage {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ChatSession {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface Test {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseComm {
		/**
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;
		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;
		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 退出
		 */
		logout(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			personUpdate: string;
			uploadMode: string;
			permmenu: string;
			person: string;
			upload: string;
			logout: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			personUpdate: boolean;
			uploadMode: boolean;
			permmenu: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseOpen {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysDepartment {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysDepartmentEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysDepartmentEntity>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			order: string;
			list: string;
			add: string;
			page: string;
			info: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
			page: boolean;
			info: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysLog {
		/**
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;
		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;
		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysLogEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysLogEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysLogEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			setKeep: string;
			getKeep: string;
			clear: string;
			page: string;
			list: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			setKeep: boolean;
			getKeep: boolean;
			clear: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysMenu {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysMenuEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysParam {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysParamEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysParamEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysRole {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysRoleEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysUserEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysYard {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysYardEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysYardEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysYardEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CarBase {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CarEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CarEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CarEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CarBody {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CarBodyEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CarBodyEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CarBodyEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CarCatalyticConverter {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CarCatalyticConverterEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CarCatalyticConverterEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CarCatalyticConverterEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CarEngine {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CarEngineEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CarEngineEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CarEngineEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CarRegInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CarRegEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CarRegEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CarRegEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CustomerProfile {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerProfileEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerProfileEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: CustomerProfileEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DemoGoods {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface JobInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<JobEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<JobEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: JobEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface OrderAction {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<OrderActionEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<OrderActionEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: OrderActionEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			add: string;
			page: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			add: boolean;
			page: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface OrderInfo {
		/**
		 * getCountBooking
		 */
		getCountBooking(data?: any): Promise<any>;
		/**
		 * getCountJob
		 */
		getCountJob(data?: any): Promise<any>;
		/**
		 * getCarInfo
		 */
		getCarInfo(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<OrderInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<OrderInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: OrderInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getCountBooking: string;
			getCountJob: string;
			getCarInfo: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getCountBooking: boolean;
			getCountJob: boolean;
			getCarInfo: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface TaskInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;
		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;
		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: TaskInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<TaskInfoEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface VehicleProfile {
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<VehicleProfileEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<VehicleProfileEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: VehicleProfileEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			upload: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			upload: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	type Service = {
		request(options: {
			url: string;
			method?: "POST" | "GET" | string;
			data?: any;
			params?: any;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		chat: { message: ChatMessage; session: ChatSession };
		test: Test;
		base: {
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
				yard: BaseSysYard;
			};
		};
		car: {
			base: CarBase;
			body: CarBody;
			catalyticConverter: CarCatalyticConverter;
			engine: CarEngine;
		};
		carReg: { info: CarRegInfo };
		customer: { profile: CustomerProfile };
		demo: { goods: DemoGoods };
		dict: { info: DictInfo; type: DictType };
		job: { info: JobInfo };
		order: { action: OrderAction; info: OrderInfo };
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		vehicle: { profile: VehicleProfile };
	};
}
