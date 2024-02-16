USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatus]    Script Date: 01/16/2024 10:49:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[Users_UpdateStatus] @StatusId int, @Id int

-- =============================================
-- Author: Elias Fernandez
-- Create date: <12/16/2023>
-- Description: <This proc changes the user's Status>
-- Code Reviewer:Michael Smith

-- MODIFIED BY: author
-- MODIFIED DATE:12/20/2020
-- Code Reviewer:
-- Note: removed a select statment from the test code
-- =============================================
/* ---TESTCODE---
Declare @StatusId int = 3
Declare @Id int = 1
execute dbo.Users_UpdateStatus @StatusId, @Id
select * from dbo.Users
*/
as


BEGIN

UPDATE dbo.Users
SET [StatusId] = @StatusId
Where Id = @Id

END
