USE [GymProDB]
GO
/****** Object:  Trigger [trg_InsertMember]    Script Date: 7/26/2025 1:18:08 AM ******/
DROP TRIGGER [dbo].[trg_InsertMember]
GO
ALTER TABLE [dbo].[Payments] DROP CONSTRAINT [FK_Payments_Memberships]
GO
ALTER TABLE [dbo].[Payments] DROP CONSTRAINT [FK_Payments_Members]
GO
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [FK__Members__user_id__3A81B327]
GO
ALTER TABLE [dbo].[Member_Memberships] DROP CONSTRAINT [FK_Member_Memberships_Memberships]
GO
ALTER TABLE [dbo].[Member_Memberships] DROP CONSTRAINT [FK_Member_Memberships_Members]
GO
ALTER TABLE [dbo].[Payments] DROP CONSTRAINT [DF__Payments__paymen__5AEE82B9]
GO
ALTER TABLE [dbo].[Memberships] DROP CONSTRAINT [DF__Membershi__creat__5441852A]
GO
/****** Object:  Index [unique_username]    Script Date: 7/26/2025 1:18:08 AM ******/
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [unique_username]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/26/2025 1:18:08 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
DROP TABLE [dbo].[Users]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 7/26/2025 1:18:08 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Payments]') AND type in (N'U'))
DROP TABLE [dbo].[Payments]
GO
/****** Object:  Table [dbo].[Memberships]    Script Date: 7/26/2025 1:18:08 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Memberships]') AND type in (N'U'))
DROP TABLE [dbo].[Memberships]
GO
/****** Object:  Table [dbo].[Members]    Script Date: 7/26/2025 1:18:08 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Members]') AND type in (N'U'))
DROP TABLE [dbo].[Members]
GO
/****** Object:  Table [dbo].[Member_Memberships]    Script Date: 7/26/2025 1:18:08 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Member_Memberships]') AND type in (N'U'))
DROP TABLE [dbo].[Member_Memberships]
GO
/****** Object:  Table [dbo].[Member_Memberships]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member_Memberships](
	[user_id] [int] NOT NULL,
	[membership_id] [int] NOT NULL,
	[start_date] [date] NOT NULL,
	[end_date] [date] NOT NULL,
 CONSTRAINT [PK_Member_Memberships] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[membership_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Members]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Members](
	[user_id] [int] NOT NULL,
	[full_name] [nvarchar](100) NULL,
	[email] [varchar](100) NULL,
	[phone] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Memberships]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Memberships](
	[membership_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[duration] [int] NOT NULL,
	[created_at] [datetime] NULL,
 CONSTRAINT [PK__Membersh__3213E83F48E07F40] PRIMARY KEY CLUSTERED 
(
	[membership_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[membership_id] [int] NULL,
	[amount] [decimal](10, 2) NULL,
	[payment_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[role] [varchar](20) NOT NULL,
 CONSTRAINT [PK__Users__3213E83F6B94F05A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Members] ([user_id], [full_name], [email], [phone]) VALUES (2, N'Tom Hong', N'tomhong2610@gmail.com', N'0344710809')
INSERT [dbo].[Members] ([user_id], [full_name], [email], [phone]) VALUES (3, N'Giong Hoang', N'hoanghai14152@gmail.com', N'0797425437')
INSERT [dbo].[Members] ([user_id], [full_name], [email], [phone]) VALUES (4, N'Cun Hong', N'cunhong1710@gmail.com', N'0379019446')
GO
SET IDENTITY_INSERT [dbo].[Memberships] ON 

INSERT [dbo].[Memberships] ([membership_id], [name], [price], [duration], [created_at]) VALUES (1, N'Student', CAST(350000.00 AS Decimal(10, 2)), 30, CAST(N'2025-07-24T23:20:51.827' AS DateTime))
INSERT [dbo].[Memberships] ([membership_id], [name], [price], [duration], [created_at]) VALUES (2, N'StudentPlus', CAST(550000.00 AS Decimal(10, 2)), 90, CAST(N'2025-07-24T23:30:49.110' AS DateTime))
INSERT [dbo].[Memberships] ([membership_id], [name], [price], [duration], [created_at]) VALUES (1002, N'Economy', CAST(1000000.00 AS Decimal(10, 2)), 30, CAST(N'2025-07-25T21:12:07.007' AS DateTime))
SET IDENTITY_INSERT [dbo].[Memberships] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (1, N'admin', N'123', N'chuphong')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (2, N'user1', N'123', N'member')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (3, N'seedGiong', N'skibidi', N'member')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (4, N'bn79', N'123321', N'member')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_username]    Script Date: 7/26/2025 1:18:08 AM ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [unique_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Memberships] ADD  CONSTRAINT [DF__Membershi__creat__5441852A]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getdate()) FOR [payment_date]
GO
ALTER TABLE [dbo].[Member_Memberships]  WITH CHECK ADD  CONSTRAINT [FK_Member_Memberships_Members] FOREIGN KEY([user_id])
REFERENCES [dbo].[Members] ([user_id])
GO
ALTER TABLE [dbo].[Member_Memberships] CHECK CONSTRAINT [FK_Member_Memberships_Members]
GO
ALTER TABLE [dbo].[Member_Memberships]  WITH CHECK ADD  CONSTRAINT [FK_Member_Memberships_Memberships] FOREIGN KEY([membership_id])
REFERENCES [dbo].[Memberships] ([membership_id])
GO
ALTER TABLE [dbo].[Member_Memberships] CHECK CONSTRAINT [FK_Member_Memberships_Memberships]
GO
ALTER TABLE [dbo].[Members]  WITH CHECK ADD  CONSTRAINT [FK__Members__user_id__3A81B327] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Members] CHECK CONSTRAINT [FK__Members__user_id__3A81B327]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Members] FOREIGN KEY([user_id])
REFERENCES [dbo].[Members] ([user_id])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_Members]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Memberships] FOREIGN KEY([membership_id])
REFERENCES [dbo].[Memberships] ([membership_id])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_Memberships]
GO
/****** Object:  Trigger [dbo].[trg_InsertMember]    Script Date: 7/26/2025 1:18:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_InsertMember]
ON [dbo].[Users]
AFTER INSERT
AS
BEGIN
  INSERT INTO Members (user_id)
  SELECT id
  FROM inserted
  WHERE role = 'member';
END;
GO
ALTER TABLE [dbo].[Users] ENABLE TRIGGER [trg_InsertMember]
GO
