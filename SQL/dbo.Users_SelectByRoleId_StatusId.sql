USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectByRoleId_StatusId]    Script Date: 01/16/2024 10:35:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[Users_SelectByRoleId_StatusId] 
@StatusId int,
@RoleId int

-- =============================================
-- Author: <Elias Fernandez>
-- Create date: <01/16/2024>
-- Description: <Selects a User by Status>
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:01/16/2024
-- Code Reviewer:
-- Note:
-- =============================================

/* ---TESTCODE---
Declare 
		@StatusId int = 6,
		@RoleId int = 3
		
		
		

execute Users_SelectByRoleId_StatusId  @StatusId ,
		@RoleId
								
*/
as 


BEGIN


SELECT u.Id,
      ,u.[firstName]
      ,u.[Email]
      ,s.Id as StatusId
      ,s.[Name] as [Status]
      ,r.Id as RoleId
      ,r.[Name] as [Role]
      ,[DateCreated]
      ,[DateModified]
 
	 
  FROM [dbo].[Users] as u inner join dbo.StatusTypes as s 
  on u.StatusId = s.Id
  inner join dbo.Roles as r on u.RoleId = r.Id
  WHERE u.[StatusId] = @StatusId AND u.[RoleId] = @RoleId
  


END
