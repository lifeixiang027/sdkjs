/*
 * (c) Copyright Ascensio System SIA 2010-2016
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia,
 * EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";
/**
 * User: Ilja.Kirillov
 * Date: 08.11.2016
 * Time: 14:37
 */

AscDFH.changesFactory[AscDFH.historyitem_AbstractNum_LvlChange]    = CChangesAbstractNumLvlChange;
AscDFH.changesFactory[AscDFH.historyitem_AbstractNum_TextPrChange] = CChangesAbstractNumTextPrChange;
AscDFH.changesFactory[AscDFH.historyitem_AbstractNum_ParaPrChange] = CChangesAbstractNumParaPrChange;

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesAbstractNumLvlChange(Class, Old, New, Index)
{
	CChangesAbstractNumLvlChange.superclass.constructor.call(this, Class, Old, New);

	this.Index = Index;
}
AscCommon.extendClass(CChangesAbstractNumLvlChange, AscDFH.CChangesBaseProperty);
CChangesAbstractNumLvlChange.prototype.Type = AscDFH.historyitem_AbstractNum_LvlChange;
CChangesAbstractNumLvlChange.prototype.WriteToBinary = function(Writer)
{
	var oAbstractNum = this.Class;

	// Long : Lvl index
	// Variable : New Lvl
	// Variable : Old Lvl

	Writer.WriteLong(this.Index);
	oAbstractNum.Write_Lvl_ToBinary(this.New, Writer);
	oAbstractNum.Write_Lvl_ToBinary(this.Old, Writer);
};
CChangesAbstractNumLvlChange.prototype.ReadFromBinary = function(Reader)
{
	var oAbstractNum = this.Class;

	// Long : Lvl index
	// Variable : New Lvl
	// Variable : Old Lvl

	this.New = {};
	this.Old = {};

	this.Index = Reader.GetLong();
	oAbstractNum.Read_Lvl_FromBinary(this.New, Reader);
	oAbstractNum.Read_Lvl_FromBinary(this.Old, Reader);
};
CChangesAbstractNumLvlChange.prototype.private_SetValue = function(Value)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Internal_SetLvl(this.Index, Value);
	oAbstractNum.Recalc_CompiledPr(this.Index);
};
CChangesAbstractNumLvlChange.prototype.Load = function(Color)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Internal_SetLvl(this.Index, this.New);

	// Сразу нельзя запускать пересчет, т.к. возможно еще не все ссылки проставлены
	AscCommon.CollaborativeEditing.Add_EndActions(this.Class, {iLvl : this.Index});
};
/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesAbstractNumTextPrChange(Class, Old, New, Index)
{
	CChangesAbstractNumTextPrChange.superclass.constructor.call(this, Class, Old, New);

	this.Index = Index;
}
AscCommon.extendClass(CChangesAbstractNumTextPrChange, AscDFH.CChangesBaseProperty);
CChangesAbstractNumTextPrChange.prototype.Type = AscDFH.historyitem_AbstractNum_TextPrChange;
CChangesAbstractNumTextPrChange.prototype.WriteToBinary = function(Writer)
{
	// Long : Lvl index
	// TextPr : New TextPr
	// TextPr : Old TextPr

	Writer.WriteLong(this.Index);
	this.New.Write_ToBinary(Writer);
	this.Old.Write_ToBinary(Writer);
};
CChangesAbstractNumTextPrChange.prototype.ReadFromBinary = function(Reader)
{
	// Long : Lvl index
	// TextPr : New TextPr
	// TextPr : Old TextPr

	this.New = new CTextPr();
	this.Old = new CTextPr();

	this.Index = Reader.GetLong();
	this.New.Read_FromBinary(Reader);
	this.Old.Read_FromBinary(Reader);
};
CChangesAbstractNumTextPrChange.prototype.private_SetValue = function(Value)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Lvl[this.Index].TextPr = Value;
	oAbstractNum.Recalc_CompiledPr(this.Index);
};
CChangesAbstractNumTextPrChange.prototype.Load = function(Color)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Lvl[this.Index].TextPr = this.New;

	// Сразу нельзя запускать пересчет, т.к. возможно еще не все ссылки проставлены
	AscCommon.CollaborativeEditing.Add_EndActions(this.Class, {iLvl : this.Index});
};
/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesAbstractNumParaPrChange(Class, Old, New, Index)
{
	CChangesAbstractNumParaPrChange.superclass.constructor.call(this, Class, Old, New);

	this.Index = Index;
}
AscCommon.extendClass(CChangesAbstractNumParaPrChange, AscDFH.CChangesBaseProperty);
CChangesAbstractNumParaPrChange.prototype.Type = AscDFH.historyitem_AbstractNum_ParaPrChange;
CChangesAbstractNumParaPrChange.prototype.WriteToBinary = function(Writer)
{
	// Long : Lvl index
	// ParaPr : New ParaPr
	// ParaPr : Old ParaPr

	Writer.WriteLong(this.Index);
	this.New.Write_ToBinary(Writer);
	this.Old.Write_ToBinary(Writer);
};
CChangesAbstractNumParaPrChange.prototype.ReadFromBinary = function(Reader)
{
	// Long : Lvl index
	// ParaPr : New ParaPr
	// ParaPr : Old ParaPr

	this.New = new CParaPr();
	this.Old = new CParaPr();

	this.Index = Reader.GetLong();
	this.New.Read_FromBinary(Reader);
	this.Old.Read_FromBinary(Reader);
};
CChangesAbstractNumParaPrChange.prototype.private_SetValue = function(Value)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Lvl[this.Index].ParaPr = Value;
	oAbstractNum.Recalc_CompiledPr(this.Index);
};
CChangesAbstractNumParaPrChange.prototype.Load = function(Color)
{
	var oAbstractNum = this.Class;
	oAbstractNum.Lvl[this.Index].ParaPr = this.New;

	// Сразу нельзя запускать пересчет, т.к. возможно еще не все ссылки проставлены
	AscCommon.CollaborativeEditing.Add_EndActions(this.Class, {iLvl : this.Index});
};