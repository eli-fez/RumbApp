USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Update]    Script Date: 2/16/2024 10:34:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Katie Emery
-- Create date: 12/19/2023
-- Description: Updates data in the dbo.FAQs table
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

ALTER PROC [dbo].[FAQs_Update]
		@Question nvarchar (255)
        ,@Answer nvarchar (2000)
        ,@CategoryId int
        ,@SortOrder int
        ,@ModifiedBy int
		,@Id int
		
AS

/*

DECLARE
		@Question nvarchar (255) = 'Test Question 2 Updated'
        ,@Answer nvarchar (2000) = 'Test Answer 2 Updated'
        ,@CategoryId int = 2
        ,@SortOrder int = 1
        ,@ModifiedBy int = 1
		,@Id int = 3



EXEC dbo.FAQs_Update
		@Question
        ,@Answer
        ,@CategoryId
        ,@SortOrder
        ,@ModifiedBy
		,@Id

*/

BEGIN

UPDATE [dbo].[FAQs]
   SET [Question] = @Question
      ,[Answer] = @Answer
      ,[CategoryId] = @CategoryId
      ,[SortOrder] = @SortOrder
      ,[ModifiedBy] = @ModifiedBy

   WHERE Id = @Id

END


