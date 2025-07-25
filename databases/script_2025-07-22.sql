USE [GymProDB]
GO
/****** Object:  Table [dbo].[Members]    Script Date: 7/22/2025 11:34:17 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 7/22/2025 11:34:17 PM ******/
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
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (1, N'admin', N'123', N'chuphong')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (2, N'user1', N'123', N'member')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (3, N'seedGiong', N'skibidi', N'member')
INSERT [dbo].[Users] ([id], [username], [password], [role]) VALUES (4, N'bn79', N'123321', N'member')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_username]    Script Date: 7/22/2025 11:34:17 PM ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [unique_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Members]  WITH CHECK ADD  CONSTRAINT [FK__Members__user_id__3A81B327] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Members] CHECK CONSTRAINT [FK__Members__user_id__3A81B327]
GO
