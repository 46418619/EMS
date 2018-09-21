USE [EMS]
GO

/****** Object:  Table [dbo].[EnquiryDetails]    Script Date: 21-09-2018 18:11:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[EnquiryDetails](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](200) NULL,
	[LastName] [varchar](200) NULL,
	[DOB] [varchar](100) NULL,
	[Mobile] [varchar](200) NULL,
	[Class] [varchar](100) NULL,
	[Address] [varchar](500) NULL,
	[Course] [varchar](100) NULL,
	[Email] [varchar](200) NULL,
	[EntryTime] [datetime] NULL,
	[ResolvedTime] [datetime] NULL,
	[Resolved] [bit] NULL,
	[Comment] [varchar](max) NULL,
	[Dated] [date] NULL,
 CONSTRAINT [PK_EnquiryDetails] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


