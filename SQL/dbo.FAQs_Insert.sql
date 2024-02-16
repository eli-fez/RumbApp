USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Insert]    Script Date: 01/16/2024 10:28:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Elias Fernandez
-- Create date: 12/18/2023
-- Description: Inserts data into the dbo.FAQs table
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

ALTER PROC [dbo].[FAQs_Insert]
	    @Question nvarchar (255)
           ,@Answer nvarchar (2000)
           ,@CategoryId int
           ,@SortOrder int
           ,@CreatedBy int
           ,@ModifiedBy int
	   ,@Id int OUTPUT

AS

/* ---TESTCODE---

 Declare @Id int = 0;

	Declare @Question nvarchar(100) = 'Test Question 2'
			,@Answer nvarchar(255) = 'Test Answer 2'
			,@CategoryId int = 2
			,@SortOrder int = 2
			,@CreatedBy int = 2
			,@ModifiedBy int = 2

	Execute dbo.FAQs_Insert @Question
				,@Answer
				,@CategoryId
				,@SortOrder
				,@CreatedBy
				,@ModifiedBy
				,@Id OUTPUT


		Select @Id

		SELECT [Id]
			  ,[Question]
			  ,[Answer]
			  ,[CategoryId]
			  ,[SortOrder]
			  ,[DateCreated]
			  ,[DateModified]
			  ,[CreatedBy]
			  ,[ModifiedBy]
		From dbo.FAQs
		Where Id = @Id

*/

BEGIN

INSERT INTO [dbo].[FAQs]
           ([Question]
           ,[Answer]
           ,[CategoryId]
           ,[SortOrder]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (@Question
           ,@Answer
           ,@CategoryId
           ,@SortOrder
           ,@CreatedBy
           ,@CreatedBy)

	SET @Id = SCOPE_IDENTITY()
	SET @ModifiedBy = @CreatedBy



END


